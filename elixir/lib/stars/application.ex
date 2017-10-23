defmodule Stars.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    Stars.Config.load(Fig.Loader.Env)
    # List all child processes to be supervised
    children = [
      Kora.Server.child_spec()
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Stars.Supervisor]
    result = Supervisor.start_link(children, opts)

    Kora.init()

    result
  end
end
