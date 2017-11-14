defmodule Stars.Config do
	use Fig

	config :stars, %{
		store: "level"
	}

	config :kora, %{
		interceptors: [
			Stars.User.Create,
			Stars.User.Email,
			Stars.User.Ethereum,
			Stars.Token.Balance,
		],
		commands: [
			Stars.Command.Auth,
		],
		read: nil,
		writes: nil,
	}

end