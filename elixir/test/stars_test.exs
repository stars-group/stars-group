defmodule StarsTest do
  use ExUnit.Case
  doctest Stars

  test "greets the world" do
    assert Stars.hello() == :world
  end
end
