"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: signupError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (signupError) {
        setError(signupError.message);
        return;
      }

      if (data.user && data.user.identities?.length === 0) {
        setError(
          "An account may already exist with this email. Try logging in instead."
        );
        return;
      }

      if (data.session) {
        window.location.assign("/");
      } else {
        setMessage(
          "Your account has been created. Please check your email for a confirmation link before logging in."
        );
      }
    } catch {
      setError("Something went wrong. Please try again.");
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
            <span className="h-2 w-2 rounded-full bg-[#D77B5B]" />
            Your next opportunity starts here
          </span>

          <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Your potential deserves an opportunity.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-[#64776B] sm:text-lg">
            Create your TON account and start discovering opportunities that
            help you learn, grow, and take your next step.
          </p>

          <div className="mt-10 hidden rounded-3xl bg-[#123F34] p-8 text-white sm:block">
            <div className="text-3xl font-semibold text-[#E9B747]">
              Together, We Rise.
            </div>
            <p className="mt-3 max-w-md leading-7 text-white/80">
              One community. More opportunities. A future full of possibilities.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/20 px-4 py-2">
                Internships
              </span>
              <span className="rounded-full border border-white/20 px-4 py-2">
                Scholarships
              </span>
              <span className="rounded-full border border-white/20 px-4 py-2">
                Jobs &amp; Skills
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-lg rounded-3xl border border-[#E6E1D5] bg-white p-6 shadow-sm sm:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#B17A27]">
              Join the community
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Create your account
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#64776B]">
              Start your journey with Tose Opportunities Network.
            </p>
          </div>

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
              <p className="mt-3">
                Already confirmed your email?{" "}
                <Link
                  href="/login"
                  className="font-semibold underline underline-offset-4"
                >
                  Log in
                </Link>
              </p>
            </div>
          )}

          <form onSubmit={handleSignup} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold"
              >
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                maxLength={100}
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-[#DCDDD4] bg-[#FCFBF8] px-4 py-3 text-base text-[#123F34] outline-none transition placeholder:text-[#92998F] focus:border-[#123F34] focus:ring-2 focus:ring-[#123F34]/10"
              />
            </div>

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
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Enter your password again"
                className="w-full rounded-xl border border-[#DCDDD4] bg-[#FCFBF8] px-4 py-3 text-base text-[#123F34] outline-none transition placeholder:text-[#92998F] focus:border-[#123F34] focus:ring-2 focus:ring-[#123F34]/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading || Boolean(message)}
              className="w-full rounded-xl bg-[#123F34] px-5 py-3.5 font-semibold text-white transition hover:bg-[#1C5546] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating your account..." : "Create account"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#64776B]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#123F34] underline decoration-[#E9B747] decoration-2 underline-offset-4 hover:text-[#1C5546]"
            >
              Log in
            </Link>
          </p>

          <p className="mt-6 text-center text-xs leading-5 text-[#92998F]">
            By creating an account, you agree to use TON respectfully and
            responsibly.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#E6E1D5] px-6 py-6 text-center text-sm text-[#64776B]">
        © 2026 Tose Opportunities Network. Together, We
        Rise.
      </footer>
    </main>
  );
}