import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const Register = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // stockage du cookie
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) {
        setError("loginError", {
          type: "manual",
          message: json.detail || "Echec",
        });
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("loginError", {
        type: "manual",
        message: "Erreur réseau",
      });
    }
  };

  const onSubmit = (data) => {
    if (data.emailog === mail && data.password === password) {
      //   return "Vous vous etes bien authentifié";
      navigate("/");
    } else {
      setError("loginError", {
        type: "manual",
        message: "Email ou mot de passe incorrect",
      });
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-center w-120 h-120 bg-emerald-800 ml-180 text-2xl"
        onSubmit={handleSubmit(Register)}
      >
        <label htmlFor="email" className="mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border-2 mb-2"
          {...register("email", { required: "Email obligatoire" })}
          placeholder="Email"
        />

        <label htmlFor="name" className="mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="border-2"
          {...register("name", {
            required: "Veuillez remplir le name",
          })}
          placeholder="Name"
        />

        <label htmlFor="password" className="mb-2">
          password
        </label>
        <input
          type="password"
          id="password"
          className="border-2"
          {...register("password", {
            required: "Veuillez remplir le mot de passe",
          })}
          placeholder="password"
        />

        <Button type="submit" className="mt-4">
          Register
        </Button>
        <Link to="/login">Login </Link>

        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        {errors.loginError && (
          <span className="text-red-500">{errors.loginError.message}</span>
        )}
      </form>
    </>
  );
}

export default Login;
