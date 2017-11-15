defmodule Stars.Token do
	@address "0x69dd512af946fe4aac434559d9349ec9f988d898"

	def balance_of(address) do
		Exeth.HTTP.eth_call(%{
			to: @address,
			data: Exeth.ABI.encode_call("balanceOf(address)", [address])
		})
	end
end