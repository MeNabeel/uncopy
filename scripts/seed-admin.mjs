import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qbitmsfyemspvinrwfvc.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!serviceRoleKey || serviceRoleKey.includes('placeholder')) {
  console.log('⚠️ Please set SUPABASE_SERVICE_ROLE_KEY in .env.local to register admin user programmatically.');
  console.log('👉 You can also copy and run the SQL script in supabase/seed-admin.sql in your Supabase SQL Editor.');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function main() {
  console.log('🚀 Provisioning admin account nabeelijaz559@gmail.com...');

  const email = 'nabeelijaz559@gmail.com';
  const password = '11!!nabch';

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name: 'Nabeel Ijaz' }
  });

  let userId = data?.user?.id;

  if (error) {
    console.log('User creation note:', error.message);
    const { data: usersData } = await supabase.auth.admin.listUsers();
    const existing = usersData?.users?.find(u => u.email === email);
    if (existing) {
      userId = existing.id;
      await supabase.auth.admin.updateUserById(userId, { password });
      console.log('Updated existing user password!');
    }
  }

  if (userId) {
    const { error: profileErr } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        name: 'Nabeel Ijaz',
        email,
        role: 'admin',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      });

    if (profileErr) {
      console.error('Failed to update admin profile:', profileErr.message);
    } else {
      console.log('✅ Admin user nabeelijaz559@gmail.com configured with role = admin!');
    }
  }
}

main().catch(console.error);
