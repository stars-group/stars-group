defmodule Stars.User.Email do
	use Kora.Interceptor
	alias Kora.Mutation
	alias Stars.User

	def before_mutation(["user:info", user], %{merge: %{"email" => email}}, _mut, _user) do
		case User.from_email(email) do
			{:error, :unknown_user} -> {:combine, Mutation.merge(["email:user", email], user)}
			_ -> {:error, :email_used}
		end
	end
end