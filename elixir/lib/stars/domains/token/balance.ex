defmodule Stars.Token.Balance do
	use Kora.Interceptor

	def resolve_path(["token:balance", address], _opts, _user) do
		Stars.Token.balance_of(address)
	end
end