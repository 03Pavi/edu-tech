# Database Migrations & Entity Management

This guide explains how to manage database entities and migrations in this project.

## Directory Structure
- **Domain Models**: `src/app/api/domain` - Pure TypeScript classes representing your business objects.
- **Infrastructure Entities**: `src/app/api/infrastructure/database/entities` - TypeORM entities with database decorators.
- **Migrations**: `src/app/api/infrastructure/database/migrations` - Migration files to sync database schema.

## Workflow: adding or Modifying an Entity

### 1. Update Domain Model
First, modify or create the pure domain class in `src/app/api/domain`.
Example: `src/app/api/domain/auth/user.ts`

```typescript
export class User {
  id!: number;
  email!: string;
  // ... new fields
}
```

### 2. Update Infrastructure Entity
Next, update the corresponding TypeORM entity in `src/app/api/infrastructure/database/entities`.
Example: `src/app/api/infrastructure/database/entities/auth/user.entity.ts`

```typescript
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;
  // ... add decorators for new fields
}
```

### 3. Generate Migration
Run the following command to automatically generate a migration file based on your entity changes. Replace `MigrationName` with a descriptive name (e.g., `AddPhoneNumberToUser`).

```bash
npm run migration:generate src/app/api/infrastructure/database/migrations/MigrationName
```

This will create a new file in the `migrations` folder.

### 4. Review and Refactor (Optional)
Open the generated migration file. You can leave it as is, or refactor it to use `Table` and `TableForeignKey` utilities for better readability, similar to existing migrations.

### 5. Run Migration
Apply the changes to your local database:

```bash
npm run migration:run
```

### 6. Revert Migration (If needed)
To undo the last applied migration:

```bash
npm run migration:revert
```

## Troubleshooting
- **Credentials**: Ensure `.env.local` has the correct `DB_HOST`, `DB_USER`, `DB_PASSWORD`, etc.
- **Connection**: Make sure your Postgres database is running.
