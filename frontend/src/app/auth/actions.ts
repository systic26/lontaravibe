'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export async function login(prevState: unknown, formData: FormData) {
  const supabase = await createClient()

  // type-casting since formData is unknown
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/explore')
}

export async function signup(prevState: unknown, formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('name') as string,
        address: formData.get('address') as string,
        phone: formData.get('phone') as string,
      }
    }
  }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    let errorMessage = error.message;
    if (errorMessage.toLowerCase().includes("user already registered") || errorMessage.toLowerCase().includes("already exists")) {
      errorMessage = "Email ini sudah terdaftar di sistem. Silakan pakai alamat Email lain.";
    } else if (errorMessage.toLowerCase().includes("profiles_phone_key") || (errorMessage.toLowerCase().includes("duplicate key") && errorMessage.toLowerCase().includes("phone"))) {
      errorMessage = "Nomor Handphone ini sudah terdaftar. Silakan gunakan Nomor HP lain.";
    }
    return { error: errorMessage }
  }

  // If email verification is required by Supabase, the user is created but session is null
  // We should NOT redirect to explore, we should ask them to check their email.
  if (authData?.user && !authData?.session) {
    return { success: "Berhasil mendaftar! Silakan periksa kotak masuk (inbox) Email Anda untuk mengklik link konfirmasi sebelum login." }
  }

  revalidatePath('/', 'layout')
  redirect('/explore')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
