-- ========================================================
-- UNSTORY CMS - SEED ADMIN USER
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/qbitmsfyemspvinrwfvc/sql)
-- ========================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  target_user_id UUID := gen_random_uuid();
BEGIN
  -- 1. Create or update user in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'nabeelijaz559@gmail.com') THEN
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      role,
      aud
    ) VALUES (
      target_user_id,
      '00000000-0000-0000-0000-000000000000',
      'nabeelijaz559@gmail.com',
      crypt('11!!nabch', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Nabeel Ijaz"}',
      NOW(),
      NOW(),
      'authenticated',
      'authenticated'
    );
  ELSE
    SELECT id INTO target_user_id FROM auth.users WHERE email = 'nabeelijaz559@gmail.com';
    UPDATE auth.users 
    SET encrypted_password = crypt('11!!nabch', gen_salt('bf')),
        email_confirmed_at = NOW()
    WHERE id = target_user_id;
  END IF;

  -- 2. Create or update profile in public.profiles with role = 'admin'
  INSERT INTO public.profiles (id, name, email, role, avatar_url)
  VALUES (
    target_user_id,
    'Nabeel Ijaz',
    'nabeelijaz559@gmail.com',
    'admin',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  )
  ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    email = 'nabeelijaz559@gmail.com',
    name = 'Nabeel Ijaz';

  RAISE NOTICE 'Admin user nabeelijaz559@gmail.com successfully created/updated!';
END $$;
