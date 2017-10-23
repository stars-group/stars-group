defmodule Stars.Config do
	use Fig

	config :stars, %{
		store: "level"
	}

	config :kora, %{
		interceptors: [
			Stars.User.Create,
			Stars.User.Email,
		],
		commands: [],
		read: nil,
		writes: nil,
	}

end