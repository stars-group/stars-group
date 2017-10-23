defmodule Stars.MixProject do
  use Mix.Project

  def project do
    [
      app: :stars,
      version: "0.1.0",
      elixir: "~> 1.6-dev",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {Stars.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:kora, github: "ironbay/kora"},
      {:fig, github: "ironbay/fig"},
    ]
  end
end
