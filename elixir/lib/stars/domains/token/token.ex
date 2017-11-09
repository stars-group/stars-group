defmodule Stars.Token do
	@address "0x7dC0B324cCE44840e0ECda1847Bc39Ac2912DecE"

	def balance_of(address) do
		Exeth.HTTP.eth_call(%{
			to: @address,
			data: Exeth.ABI.encode_call("balanceOf(address)", [address])
		})
	end
end