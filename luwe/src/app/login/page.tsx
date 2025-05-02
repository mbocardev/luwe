// luwe/app/login/page.tsx
export default function LoginPage() {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Connexion</h2>
          <form>
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Mot de passe" className="input mt-4" />
            <button type="submit" className="btn mt-6 w-full">Se connecter</button>
          </form>
        </div>
      </main>
    );
  }