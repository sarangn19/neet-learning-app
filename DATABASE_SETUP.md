# Database Setup Guide for NEET Learning App

This guide will help you set up a real database for your NEET learning app using **Supabase** (PostgreSQL).

## 🎯 Quick Start

### 1. Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up with your email or GitHub
3. Click "New Project"
4. Choose a name (e.g., "neet-learning-app")
5. Select your region (closest to your users)
6. Choose the "Free" plan

### 2. Get Your API Credentials
1. In your project dashboard, go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://abcdefgh12345678.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

### 3. Set Up Environment Variables
1. Copy the example file:
   ```bash
   copy .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-url.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Run the Database Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the contents from `supabase/setup.sql`
4. Click **Run**

### 5. Test the Connection
```bash
npm run dev
```

Open your app and check the browser console. You should see:
- "Supabase credentials not found. Using localStorage fallback mode." (if no env vars set)
- Or a successful connection message

## 📊 Database Schema

### Tables Created

1. **users** - User accounts and profiles
   - `id`, `email`, `name`, `avatar`
   - `role` (user/admin/superadmin)
   - `status` (active/inactive/suspended)
   - `gems`, `level`, `streak`, `completed_lessons`
   - `created_at`, `updated_at`

2. **lesson_progress** - Tracks lesson completion
   - `user_id` → users.id
   - `lesson_id`, `completed`, `score`
   - `time_spent`, `completed_at`

3. **badges** - User achievements
   - `user_id` → users.id
   - `name`, `icon`, `earned_at`

4. **system_logs** - Admin audit logs
   - `action`, `type` (success/warning/error/info)
   - `user_id`, `user_email`
   - `created_at`

## 🔒 Security Features

- **Row Level Security (RLS)**: Users can only access their own data
- **Admins can access all**: Admin users have full read access
- **Real-time enabled**: Live updates for all tables

## 🚀 Migration from localStorage

The app is designed to work **without** a database initially. Your existing localStorage data is preserved.

When you connect to Supabase:
1. The app will detect the connection
2. New data goes to the database
3. Old localStorage data remains as fallback

To migrate existing users:
```javascript
// In browser console after connecting to Supabase
const stored = localStorage.getItem('admin-storage');
if (stored) {
  const data = JSON.parse(stored);
  // Users will be re-created when they log in
  console.log('Found', data.state?.users?.length, 'users in localStorage');
}
```

## 💡 Features You Get

- ✅ User authentication (email/password)
- ✅ Admin user management (create, edit, delete, suspend)
- ✅ Lesson progress tracking per user
- ✅ Badge/achievement system
- ✅ System audit logs
- ✅ Real-time updates (no page refresh needed)
- ✅ Automatic data persistence
- ✅ Scales to thousands of users

## 🔧 Troubleshooting

### "Cannot find module '../types/database'"
This is expected - the types file is created. Restart your dev server:
```bash
npm run dev
```

### "Property 'env' does not exist on type 'ImportMeta'"
This is a TypeScript warning. The app will still work. To fix it properly, you can add a type declaration.

### Fallback Mode
If you see "Using localStorage fallback mode", it means your environment variables aren't set. Check:
1. `.env.local` file exists
2. Variables start with `VITE_`
3. You restarted the dev server after creating `.env.local`

## 📚 Next Steps

1. Set up email authentication in Supabase Auth settings
2. Configure password reset emails
3. Set up custom SMTP for transactional emails
4. Add Google OAuth login (optional)

## 💰 Pricing

Supabase Free Tier includes:
- 500MB database storage
- 2GB bandwidth/month
- 50,000 users
- Unlimited API requests (fair use)

Perfect for a learning app with up to ~10,000 active users!

---

Need help? Check [Supabase Documentation](https://supabase.com/docs)
