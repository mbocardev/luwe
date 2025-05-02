// luwe/app/register/page.tsx
export default function RegisterPage() {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Inscription</h2>
          <form>
            <input type="text" placeholder="Nom complet" className="input" />
            <input type="email" placeholder="Email" className="input mt-4" />
            <input type="password" placeholder="Mot de passe" className="input mt-4" />
            <button type="submit" className="btn mt-6 w-full">S'inscrire</button>
          </form>
        </div>
      </main>
    );
  }
  