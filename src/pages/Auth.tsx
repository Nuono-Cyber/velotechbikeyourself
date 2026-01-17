import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import logo from '@/assets/logo.png';

export default function Auth() {
  const navigate = useNavigate();
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { register, login, isLoading, error, isAuthenticated } = useAuthContext();

  // Redirect authenticated users to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    setLocalError(null);
    
    if (!formData.email || !formData.password) {
      setLocalError('Email e senha são obrigatórios');
      return false;
    }

    if (!isLogin) {
      if (!formData.name || formData.name.length < 3) {
        setLocalError('Nome deve ter pelo menos 3 caracteres');
        return false;
      }
      if (formData.password.length < 6) {
        setLocalError('Senha deve ter pelo menos 6 caracteres');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setLocalError('As senhas não correspondem');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    if (!validateForm()) return;

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.name, formData.password, formData.phone, formData.address);
        setSuccessMessage('Conta criada com sucesso! Você já está logado.');
      }
    } catch (err) {
      // Error already set by hook
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
    });
    setLocalError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="VeloTech" className="h-16 w-auto" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Bem-vindo de volta!' : 'Criar Conta'}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isLogin ? 'Entre em sua conta para continuar' : 'Cadastre-se para começar a pedalar'}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          {successMessage && (
            <Alert className="mb-4 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          {(error || localError) && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error || localError}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome completo *
                </label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  className="h-11"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-11"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha *
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder={isLogin ? 'Sua senha' : 'Mínimo 6 caracteres'}
                value={formData.password}
                onChange={handleChange}
                required
                className="h-11"
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar senha *
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Repita a senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                    className="h-11"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-11"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <Input
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Rua, número, cidade"
                    value={formData.address}
                    onChange={handleChange}
                    className="h-11"
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  resetForm();
                }}
                className="text-orange-500 hover:text-orange-600 font-semibold transition-colors"
              >
                {isLogin ? 'Registre-se' : 'Faça login'}
              </button>
            </p>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Voltar para a loja
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
