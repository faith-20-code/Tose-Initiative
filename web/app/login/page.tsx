"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (loginError) {
        setError(
          loginError.message === "Invalid login credentials"
            ? "Incorrect email or password. Please try again."
            : loginError.message
        );
        return;
      }

      window.location.assign("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Enter your email address above first.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/login`,
        }
      );

      if (resetError) {
        setError(resetError.message);
      } else {
        setMessage(
          "If an account exists for that email, a password reset link will be sent. Check your inbox."
        );
      }
    } catch {
      setError("We couldn't request a password reset. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F4E9] text-[#123F34]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#123F34] text-lg font-bold text-white">
            T
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight">
              TOSE
            </span>
            <span className="block text-xs tracking-wide text-[#64776B]">
              OPPORTUNITIES NETWORK
            </span>
          </span>
        </Link>

        <Link
          href="/"
          className="text-sm font-semibold text-[#123F34] hover:underline"
        >
          Back to home
        </Link>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-6 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:pb-24 lg:pt-12">
        <div className="mx-auto max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#DCE5D8] bg-white/70 px-4 py-2 text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-[#E9B747]" />
            Welcome back to TON
          </span>

          <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Your next opportunity is waiting.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-[#64776B] sm:text-lg">
            Sign in to continue discovering opportunities, building your skills,
            and moving closer to your goals.
          </p>

          <div className="mt-10 hidden rounded-3xl bg-[#123F34] p-8 text-white sm:block">
            <div className="text-3xl font-semibold text-[#E9B747]">
              Together, We Rise.
            </div>
            <p className="mt-3 max-w-md leading-7 text-white/80">
              Your journey matters. Come back to a community that believes in
              your potential.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/20 px-4 py-2">
                Discover
              </span>
              <span className="rounded-full border border-white/20 px-4 py-2">
                Connect
              </span>
              <span className="rounded-full border border-white/20 px-4 py-2">
                Grow
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-lg rounded-3xl border border-[#E6E1D5] bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#B17A27]">
            Your journey continues
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Welcome back
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#64776B]">
            Enter your details to sign in to your account.
          </p>

          {error && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {message && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
            >
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#DCDDD4] bg-[#FCFBF8] px-4 py-3 text-base text-[#123F34] outline-none transition placeholder:text-[#92998F] focus:border-[#123F34] focus:ring-2 focus:ring-[#123F34]/10"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="text-sm font-semibold text-[#123F34] underline decoration-[#E9B747] underline-offset-4 hover:text-[#1C5546] disabled:opacity-50"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-[#DCDDD4] bg-[#FCFBF8] px-4 py-3 pr-20 text-base text-[#123F34] outline-none transition placeholder:text-[#92998F] focus:border-[#123F34] focus:ring-2 focus:ring-[#123F34]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-sm font-semibold text-[#123F34] hover:bg-[#E8F0E8]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#123F34] px-5 py-3.5 font-semibold text-white transition hover:bg-[#1C5546] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing you in..." : "Log in"}
            </button>
          </form>

          <div className="mt-7 text-center text-sm text-[#64776B]">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-[#123F34] underline decoration-[#E9B747] decoration-2 underline-offset-4 hover:text-[#1C5546]"
            >
              Sign up
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E6E1D5] px-6 py-6 text-center text-sm text-[#64776B]">
        © 2026 Tose Opportunities Network. Together, We Rise.
      </footer>
    </main>
  );
}