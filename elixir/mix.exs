defmodule Stars.MixProject do
  use Mix.Project

  def project do
    [
      app: :stars,
      version: "0.1.0",
      # elixir: "~> 1.5.2",
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
      {:dynamic_ex, github: "ironbay/dynamic_ex"},
      {:exeth, github: "ironbay/exeth"},
      {:comeonin, "~> 3.0"},

			{:distillery, "~> 1.4", runtime: false}
    ]
  end
end
