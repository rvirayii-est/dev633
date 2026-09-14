---
name: 'Security Lab #002 — Authentication vs Authorization: The Difference That Causes Real Security Bugs'
description: 'Authentication proves identity. Authorization protects resources. Being logged in is only the beginning.'
status: 'Active'
technologies: ['Spring Boot', 'Spring Security', 'JWT', 'RBAC', 'Multi-Tenancy', 'OWASP']
featured: false
order: 3
draft: false
---

> Entry 002 of the [deV633 Security Lab](/rnd/dev633-security-lab). It picks up where
> [entry 001](/rnd/security-lab-001-cybersecurity-for-developers) left off: the
> payslip with the edited ID, the hidden button, the admin route with no check.

In Security Lab #001, we started with a simple idea:

> Developers usually ask, “Does this feature work?”
>
> Security also asks, “How can this feature be abused?”

For Lab #002, we’ll look at one of the most common places where that abuse happens:

**Authentication and authorization.**

They sound similar.

They often appear together.

But they solve two completely different problems.

And confusing them can create serious security vulnerabilities.

---

## The Simplest Difference

Authentication answers:

> **Who are you?**

Authorization answers:

> **What are you allowed to do?**

That sounds simple enough.

But in real applications, developers sometimes stop after authentication.

A user successfully logs in.

They receive a valid session or JWT.

The backend knows who they are.

And then we accidentally assume:

> “They’re authenticated, so the request is okay.”

That assumption is dangerous.

A user can be completely legitimate and still attempt an action they are not allowed to perform.

---

## A Simple Example

Imagine an HR system.

Alice logs in successfully.

The backend identifies her as:

```text
User: Alice
Employee ID: 102
Role: EMPLOYEE
```

Alice then requests:

```http
GET /api/employees/102/payslip
```

That makes sense.

She is requesting her own payslip.

Now Alice changes the request:

```http
GET /api/employees/103/payslip
```

Suppose employee 103 belongs to Bob.

If the API returns Bob's payslip, authentication technically worked.

The system correctly identified Alice.

But authorization failed.

The backend asked:

```text
Is Alice logged in?
```

But it failed to ask:

```text
Is Alice allowed to access employee 103?
```

That distinction is the entire point of Lab #002.

---

## Authentication: Proving Identity

Authentication establishes identity.

Typical authentication mechanisms include:

```text
Username + password
Session cookies
JWT
OAuth2 / OpenID Connect
API keys
Passkeys
Biometrics
MFA
```

A login flow might look like:

```text
User
 ↓
Username + Password
 ↓
Identity Provider
 ↓
Credentials Valid?
 ↓
Authenticated Identity
 ↓
Session / Token
```

For example:

```json
{
  "sub": "user-123",
  "name": "Alice",
  "email": "alice@example.test"
}
```

The system now knows:

```text
This request belongs to Alice.
```

Authentication is complete.

But we still have not answered what Alice can do.

---

## Authorization: Controlling Access

Authorization happens after identity is established.

The system might ask:

```text
Can Alice view payroll?

Can Alice approve leave?

Can Alice edit employee records?

Can Alice access branch B?

Can Alice manage users?

Can Alice delete this invoice?

Can Alice access this customer's data?
```

Authorization can depend on many factors:

```text
Role
Permission
Ownership
Organization
Branch
Department
Resource
Subscription level
Location
Time
Workflow state
```

This is where application security becomes more interesting.

---

## Role-Based Access Control

A common implementation is Role-Based Access Control or RBAC.

For example:

```text
ADMIN
MANAGER
CASHIER
EMPLOYEE
```

Then permissions are attached to each role.

Example:

```text
ADMIN
  users:create
  users:update
  users:delete
  payroll:view
  payroll:process

MANAGER
  employees:view
  schedules:update
  reports:view

EMPLOYEE
  profile:view
  payslip:view-own
```

Then your backend checks the role or permission before allowing the action.

For example:

```java
@PreAuthorize("hasRole('ADMIN')")
public void deleteUser(Long id) {
    ...
}
```

This is better than checking only whether the user is authenticated.

But roles alone can still become too coarse.

---

## Why Permissions Are Often Better Than Roles

Imagine someone has the role:

```text
BRANCH_HR
```

What exactly does that mean?

Can they:

```text
View employees?
Edit employees?
Approve overtime?
Run payroll?
View salaries?
Create users?
Access every branch?
```

The role name itself does not answer those questions.

A permission-based model can be more explicit.

Example:

```text
employee:read
employee:update
attendance:approve
payroll:view
payroll:process
```

Then a user can have only the capabilities they actually need.

For example:

```text
Branch HR

employee:read
employee:update
attendance:approve
```

But not:

```text
payroll:process
user:delete
organization:update
```

This principle is called:

> **Least privilege**

Give a user only the permissions necessary to perform their job.

Nothing more.

---

## Authentication Happens Once. Authorization Happens Constantly.

This is an important mental model.

Authentication usually happens at login.

Authorization happens repeatedly throughout the system.

For example:

```text
Login
  ↓
AUTHENTICATION
  ↓
Dashboard
  ↓
Can view reports?
  ↓
AUTHORIZATION
  ↓
Open employee
  ↓
Can view this employee?
  ↓
AUTHORIZATION
  ↓
Edit salary
  ↓
Can edit salary?
  ↓
AUTHORIZATION
  ↓
Approve payroll
  ↓
Can approve this payroll?
  ↓
AUTHORIZATION
```

A secure application checks authorization whenever a protected action occurs.

---

## Hiding a Button Is Not Authorization

Imagine this Vue component:

```vue
<button v-if="user.role === 'ADMIN'">
  Delete User
</button>
```

This is useful for user experience.

But it is not security.

Someone can bypass the frontend completely and send:

```http
DELETE /api/users/123
```

using:

```text
Postman
curl
Browser DevTools
Burp Suite
A custom script
Another frontend
```

If the backend does not validate authorization, the hidden button accomplished nothing.

The frontend should control presentation.

The backend must control authority.

A strong rule:

> **Never rely on the frontend to enforce security.**

---

## Authentication Token ≠ Authorization

JWTs are another place developers sometimes become confused.

Suppose the API receives:

```text
Authorization: Bearer eyJ...
```

The token is:

```text
valid
signed
not expired
issued by the correct identity provider
```

That proves the identity is legitimate.

It still does not mean every request should be accepted.

Think about this:

```text
Valid JWT
≠
Permission to do everything
```

The correct flow is:

```text
Token valid?
      ↓
Who is the user?
      ↓
What permissions do they have?
      ↓
Which resource are they accessing?
      ↓
Are they allowed to perform this action?
      ↓
Allow / Deny
```

---

## Resource-Level Authorization

This is where many real vulnerabilities happen.

Suppose a SaaS platform has two organizations:

```text
Tenant A
Tenant B
```

Alice belongs to Tenant A.

She requests:

```http
GET /api/customers/100
```

Customer 100 belongs to Tenant A.

Allowed.

Then Alice changes the request:

```http
GET /api/customers/200
```

Customer 200 belongs to Tenant B.

If the system checks only:

```text
Does Alice have customer:read?
```

then it may accidentally return Tenant B's customer.

The correct authorization rule is closer to:

```text
Alice has customer:read
AND

Customer 200 belongs to an organization
Alice is authorized to access.
```

This is called **resource-level authorization**.

---

## Multi-Tenant Systems Make Authorization More Important

Suppose your database contains:

```text
customers

id | tenant_id | name
------------------------
1  | A         | John
2  | A         | Maria
3  | B         | Robert
```

Alice belongs to tenant A.

She should never retrieve:

```text
tenant_id = B
```

Even if she guesses the ID.

Bad query:

```sql
SELECT *
FROM customers
WHERE id = :id;
```

Better:

```sql
SELECT *
FROM customers
WHERE id = :id
AND tenant_id = :authorizedTenant;
```

Even better, enforce tenant isolation at multiple layers:

```text
Request authorization
      +
Service-level authorization
      +
Repository filtering
      +
Database isolation
```

Defense in depth again.

---

## Ownership-Based Authorization

Not every rule is based on roles.

Sometimes access depends on ownership.

Consider:

```http
DELETE /api/posts/123
```

A normal user may be allowed to delete posts.

But only their own posts.

The rule becomes:

```text
user has post:delete

AND

post.owner_id == current_user.id
```

You could model this as:

```text
CanDeletePost(user, post)

if user.isAdmin:
    allow

else if user.id == post.ownerId:
    allow

else:
    deny
```

Authorization depends on both:

```text
Who is asking?
+
What resource are they asking about?
```

---

## Contextual Authorization

Sometimes authorization depends on more than user and resource.

For example:

```text
A manager can approve overtime

BUT

not their own overtime.
```

Or:

```text
Branch HR can edit employees

BUT

only employees assigned to their branch.
```

Or:

```text
Payroll can be modified

BUT

only while status = DRAFT.
```

Now authorization becomes:

```text
identity
+
permission
+
resource
+
relationship
+
workflow state
```

This is why security often becomes a domain-modeling problem rather than just a framework configuration problem.

---

## Broken Access Control

When authorization fails, the broader vulnerability category is often called **Broken Access Control**.

Examples include:

```text
Accessing another user's records

Calling admin endpoints as a normal user

Changing an ID in the URL

Viewing another tenant's data

Calling APIs hidden from the UI

Changing ownership fields

Performing actions outside your assigned branch

Accessing resources after permissions were revoked
```

One particularly common pattern is IDOR.

---

## IDOR

IDOR means:

**Insecure Direct Object Reference**

Consider:

```http
GET /api/invoices/1001
```

The developer expects a user to access invoice 1001.

But the attacker tries:

```http
GET /api/invoices/1002
GET /api/invoices/1003
GET /api/invoices/1004
```

If the API returns invoices belonging to other users, organizations, or customers, authorization is broken.

The mistake is not using numeric IDs.

The mistake is:

> The server trusts possession of an identifier as proof of authorization.

An ID identifies a resource.

It does not grant access to it.

---

## UUIDs Do Not Fix Authorization

Developers sometimes respond to IDOR by replacing:

```text
1001
```

with:

```text
550e8400-e29b-41d4-a716-446655440000
```

UUIDs are harder to guess.

But they do not solve the authorization problem.

If Alice somehow obtains Bob's UUID and the API does this:

```sql
SELECT *
FROM invoice
WHERE uuid = :uuid;
```

without checking ownership or tenant boundaries, the vulnerability still exists.

So:

```text
Hard-to-guess IDs
≠
Authorization
```

---

## Deny by Default

A strong security design principle is:

> **Deny unless explicitly allowed.**

Avoid thinking:

```text
Everyone can access it except these users.
```

Prefer:

```text
Nobody can access it unless they satisfy the access rule.
```

Conceptually:

```java
if (!authorized(user, resource, action)) {
    throw new AccessDeniedException();
}

performAction();
```

Authorization failure should stop execution.

---

## HTTP 401 vs 403

This distinction is useful for developers.

### 401 Unauthorized

Despite the name, HTTP 401 usually means:

> You have not successfully authenticated.

Examples:

```text
No token
Invalid token
Expired token
Invalid session
```

### 403 Forbidden

403 means:

> We know who you are, but you are not allowed to do this.

Example:

```text
Alice is authenticated.

Alice tries to delete a user.

Alice lacks user:delete.

→ 403 Forbidden
```

Easy mental model:

```text
401 = Who are you?

403 = I know who you are, but no.
```

---

## A Safer Spring Boot Example

Suppose we have:

```java
@GetMapping("/employees/{id}")
public Employee getEmployee(@PathVariable Long id) {
    return employeeService.getById(id);
}
```

If authentication is enabled, this might already require the user to log in.

But authorization is missing.

A better approach could include:

```java
@PreAuthorize("hasAuthority('employee:read')")
@GetMapping("/employees/{id}")
public Employee getEmployee(@PathVariable Long id) {
    return employeeService.getAuthorizedEmployee(id);
}
```

Then inside the service:

```java
Employee employee = repository.findById(id)
    .orElseThrow(NotFoundException::new);

if (!accessGuard.canAccess(currentUser, employee)) {
    throw new AccessDeniedException("Forbidden");
}

return employee;
```

Now we have two checks:

```text
Does the user have employee:read?

AND

Can this specific user access this specific employee?
```

That distinction matters.

---

## Don't Scatter Authorization Everywhere

There is another architectural lesson here.

Suppose you write authorization logic like this:

```text
Controller A → check role
Controller B → check branch
Service C → check tenant
Controller D → forgot to check
```

Eventually someone forgets one.

That becomes a security bug.

Instead, create explicit access-control components.

For example:

```text
EmployeeAccessGuard
PayrollAccessGuard
TenantAccessGuard
InventoryAccessGuard
```

Then authorization becomes part of the system design.

Example:

```java
employeeAccessGuard.requireReadAccess(currentUser, employee);
```

This is easier to test, audit, and reason about.

---

## Security Logic Is Business Logic

This is one of the most important lessons in this lab.

Consider:

```text
Only the employee's manager can approve overtime.

Branch HR can correct attendance only for their assigned branches.

Payroll becomes immutable once finalized.

Cashiers cannot reopen another cashier's closed shift.
```

These are business rules.

They are also security rules.

That means security cannot always be delegated entirely to:

```text
Keycloak
Spring Security
JWT
Cloudflare
Firewall
```

Those tools provide mechanisms.

Your application still needs to understand its domain.

---

## The Principle of Least Privilege

Least privilege means:

> Give users, services, and systems only the access they need.

Instead of:

```text
ADMIN
```

everywhere, consider smaller capabilities:

```text
inventory:read
inventory:adjust
inventory:approve
inventory:transfer

employee:read
employee:update
employee:terminate

payroll:view
payroll:prepare
payroll:approve
```

This allows different responsibilities without giving unnecessary authority.

It also reduces damage if an account becomes compromised.

---

## Separation of Duties

Another useful concept is **separation of duties**.

Suppose one person can:

```text
Create payroll
Approve payroll
Release payroll
Edit payroll afterward
```

That is convenient.

But from a control perspective, it may be dangerous.

A stronger workflow might be:

```text
Payroll Staff
     ↓
Prepare Payroll
     ↓
HR Manager
     ↓
Review
     ↓
Authorized Approver
     ↓
Finalize
```

Security is not always:

```text
Allow / Deny
```

Sometimes it is about designing safe workflows.

---

## Authentication and Authorization in a Real Architecture

A typical system might look like:

```text
                USER
                  │
                  ▼
           ┌──────────────┐
           │ Identity     │
           │ Provider     │
           │              │
           │ Keycloak     │
           │ Auth0        │
           │ Entra ID     │
           └──────┬───────┘
                  │
               Token
                  │
                  ▼
           ┌──────────────┐
           │ Backend API  │
           └──────┬───────┘
                  │
        Validate identity
                  │
                  ▼
        Load permissions
                  │
                  ▼
       Evaluate resource
                  │
                  ▼
       Authorization rule
                  │
            ┌─────┴─────┐
            ▼           ▼
          ALLOW        DENY
```

The identity provider tells you who the user is.

Your application often still needs to decide what that identity means inside your domain.

---

## A Small Lab

For this exercise, imagine we have two users.

```text
Alice

id = 1
role = USER
```

and:

```text
Bob

id = 2
role = USER
```

The endpoint is:

```http
GET /api/users/{id}
```

Alice logs in.

Test:

```http
GET /api/users/1
```

Expected:

```text
200 OK
```

Now try:

```http
GET /api/users/2
```

Ask:

```text
Should Alice see Bob?

If yes, why?

If no, where is that rule enforced?
```

Now imagine an admin:

```text
Charlie

id = 3
role = ADMIN
```

Should Charlie access both?

Maybe.

But even then, ask:

```text
Does every ADMIN need this access?

Could a narrower permission exist?

Should the access be audited?
```

This simple exercise demonstrates that authorization is about policy, not merely code.

---

## Test the Negative Cases

Developers naturally test successful flows.

Security testing requires negative cases.

Instead of only testing:

```text
Admin can delete user.
```

also test:

```text
Normal user cannot delete user.

Unauthenticated user cannot delete user.

User from tenant A cannot delete tenant B user.

Expired token cannot delete user.

User with read permission cannot delete user.

Former admin cannot delete user after privilege removal.
```

The negative tests are often more important.

---

## A Good Authorization Test Matrix

For important endpoints, create a matrix.

Example:

| Actor     |     Read | Create |   Update | Delete |
| --------- | -------: | -----: | -------: | -----: |
| Admin     |        ✅ |      ✅ |        ✅ |      ✅ |
| Manager   |        ✅ |      ✅ |        ✅ |      ❌ |
| Employee  | Own only |      ❌ | Own only |      ❌ |
| Anonymous |        ❌ |      ❌ |        ❌ |      ❌ |

Then add resource boundaries:

```text
Same tenant
Different tenant

Own branch
Different branch

Own resource
Other user's resource
```

This makes access rules visible instead of hidden inside scattered `if` statements.

---

## Developer Checklist

Before shipping an endpoint, ask:

```text
□ Does this endpoint require authentication?

□ What permission is required?

□ Does permission alone provide enough context?

□ Does ownership matter?

□ Does tenant membership matter?

□ Does branch or department matter?

□ Does workflow state matter?

□ Can the client manipulate the resource ID?

□ Can the frontend restriction be bypassed?

□ Is authorization enforced on the backend?

□ What happens if access is denied?

□ Is sensitive access logged?

□ Are negative authorization tests included?

□ What happens after a user's permission is revoked?
```

---

## The Important Lesson

Authentication and authorization work together.

But they should never be confused.

Authentication says:

```text
I know who this user is.
```

Authorization says:

```text
I know exactly what this user is allowed to do.
```

A secure application needs both.

Because one of the most dangerous assumptions we can make is:

> “The user is logged in, therefore we can trust the request.”

We cannot.

Authenticated users are still untrusted input.

Every sensitive action must be authorized.

Every protected resource must have an access rule.

And those rules should be enforced by the backend—not by the UI, not by obscurity, and not by assumptions.

---

## Security Lab #002 Challenge

Take one system you have built.

Choose five endpoints.

For each endpoint, answer:

```text
1. Who can call it?

2. What permission is required?

3. Does ownership matter?

4. Does tenant or branch membership matter?

5. What should happen if someone changes the resource ID?

6. What negative tests should exist?
```

Then create an authorization matrix.

You may discover that some of your existing endpoints rely more on assumptions than actual authorization.

That discovery is exactly what this lab is about.

---

## Next

**Security Lab #003 — Understanding HTTP Through a Security Lens**

Before we go deeper into web vulnerabilities, we need to understand the protocol underneath almost every web attack and defense:

```text
Requests
Responses
Headers
Cookies
Sessions
Tokens
Status codes
CORS
HTTPS
```

Because if you're going to secure web applications, you need to understand what is actually moving across the wire.

---

**Main takeaway:**

> Authentication proves identity. Authorization protects resources.

And in secure software, being logged in is only the beginning.
