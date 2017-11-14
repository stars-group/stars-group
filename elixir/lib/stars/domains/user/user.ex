defmodule Stars.User do
	alias Comeonin.Bcrypt
	alias Kora.UUID
	alias Kora.Mutation
	import Dynamic.Macros

	def from_email(email) do
		case Kora.query_path!(["email:user", email]) do
			nil -> {:error, :unknown_user}
			result -> {:ok, result}
		end
	end

	def from_token(token) do
		Kora.query_path!(["token:user", token])
	end

	def create(name, address, email, ethereum, dob) do
		key = UUID.ascending()
		["user:info", key]
		|> Mutation.merge(%{
			"name" => name,
			"key" => key,
			"address" => address,
			"ethereum" => ethereum,
			"email" => email,
			"dob" => dob,
		})
		|> Kora.mutation
		|> case do
			{:ok, _} -> {:ok, key}
			result -> result
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
				|> case do
					true -> :ok
					false -> {:error, :bad_password}
				end
		end
	end

	def login(user) do
		token = UUID.ascending()
		Kora.merge(["token:user", token], user)
		token
	end

	# User Info
	get [
		:key,
		:email,
	]

end