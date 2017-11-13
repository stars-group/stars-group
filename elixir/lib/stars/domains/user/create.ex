defmodule Stars.User.Create do
	use Kora.Interceptor
	alias Kora.Mutation

	def before_mutation(["user:info", user], %{merge: %{"key" => _}}, _mut, _user) do
		{
			:combine,
			Mutation.new
			|> Mutation.merge(["user:data", user, "key"],  user)
			|> Mutation.merge(["user:info", user, "created"],  :os.system_time(:millisecond))
		}
	end
end

defmodule Stars.User.Address do
	use Kora.Interceptor

	def before_mutation(["user:info", _key], %{merge: %{"address" => address}}, _mut, _user) do
		case String.length(address) do
			42 -> :ok
			_ -> {:error, :invalid_address}
		end
	end
end