"use server";

export async function registerUserAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const phone = formData.get('phone') as string;

  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
        phone: phone,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, user: data.user };
    } else {
      return { success: false, error: data.error.message };
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}