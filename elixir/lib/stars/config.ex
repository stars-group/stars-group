defmodule Stars.Config do
	use Fig

	config :stars, %{
		store: "level"
	}

	config :kora, %{
		interceptors: [],
		commands: [],
		read: nil,
		write: nil,
	}

end