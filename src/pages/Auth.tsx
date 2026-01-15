import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const { register, login, isLoading, error, isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>🎉 Bem-vindo!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Você está autenticado no VeloTech</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setLocalError('As senhas não correspondem');
          return;
        }
        await register(formData.email, formData.name, formData.password, formData.phone, formData.address);
      }
    } catch (err) {
      // Erro já foi definido pelo hook
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {isLogin ? '🚴 Login VeloTech' : '📝 Criar Conta'}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin ? 'Entre em sua conta para continuar' : 'Crie uma conta para começar'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {(error || localError) && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error || localError}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                type="text"
                name="name"
                placeholder="Nome completo"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            )}

            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {!isLogin && (
              <>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar senha"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                />

                <Input
                  type="tel"
                  name="phone"
                  placeholder="Telefone (opcional)"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <Input
                  type="text"
                  name="address"
                  placeholder="Endereço (opcional)"
                  value={formData.address}
                  onChange={handleChange}
                />
              </>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? '⏳ Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setLocalError(null);
                  setFormData({
                    email: '',
                    name: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    address: '',
                  });
                }}
                className="text-orange-500 hover:text-orange-600 font-semibold"
              >
                {isLogin ? 'Registre-se' : 'Faça login'}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
