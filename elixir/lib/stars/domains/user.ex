defmodule Stars.User do
	alias Comeonin.Bcrypt
	alias Kora.UUID
	alias Kora.Mutation

	def create(email, password) do
		key = UUID.ascending()
		["user:info", key]
		|> Mutation.merge(%{
			"key" => key,
			"email" => email
		})
		|> Mutation.combine(set_password(key, password))
		|> Kora.mutation
		|> case do
			{:ok, _} -> {:ok, key}
			result -> result
		end
	end

	def from_email(email) do
		case Kora.query_path!(["email:user", email]) do
			nil -> {:error, :unknown_user}
			result -> {:ok, result}
		end
	end

	def set_password(user, password) do
		hash = Bcrypt.hashpwsalt(password)
		["user:data", user, "password"]
		|> Mutation.merge(hash)
	end

	def check_password(user, password) do
		case ["user:data", user, "password"] |> Kora.query_path! do
			nil -> {:error, :bad_user}
			hash ->
				password
				|> Bcrypt.checkpw(hash)
		end
	end
end