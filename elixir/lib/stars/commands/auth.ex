defmodule Stars.Command.Auth do
	use Kora.Command
	alias Stars.User

	def handle_command({"auth.register", body, _version}, _from, state) do
		with %{
				"name" => name,
				"email" => email,
				"address" => address,
				"ethereum" => ethereum,
				"dob" => dob
			} <- body,
			{:ok, key} <- User.create(name, address, email, ethereum, dob)
		do
			{:reply, key, state}
		else
			{:error, error} -> {:error, error, state}
			_ -> {:error, :invalid_input, state}
		end
	end

	def handle_command({"auth.login", body, _version}, _from, state) do
		%{
			"email" => email,
			"password" => password,
		} = body
		with _ <- 1,
			{:ok, user} <- User.from_email(email),
			:ok <- User.check_password(user, password)
		do
			token = User.login(user)
			{:reply, token, state}
		else
			{:error, error} -> {:error, error, state}
		end
	end

	def handle_command({"auth.upgrade", body, _version}, _from, state) do
		%{
			"token" => token,
		} = body
		case User.from_token(token) do
			nil -> {:error, "Bad token", state}
			user ->
				{:reply, user, %{
					user: user,
				}}
		end
	end
end