defmodule Stars.Command.Auth do
	use Kora.Command
	alias Stars.User

	def handle_command({"auth.register", body, _version}, _from, state) do
		%{
			"email" => username,
			"password" => password,
		} = body
		{:ok, key} = User.create(email, password)
		{:reply, key, state)}
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
			User.unlock(customer, user)
			token = User.login(customer, user)
			{:reply, token, state}
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