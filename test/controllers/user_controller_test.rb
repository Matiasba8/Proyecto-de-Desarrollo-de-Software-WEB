require 'test_helper'

class UserControllerTest < ActionDispatch::IntegrationTest
  test "should get login" do
    get user_login_url
    assert_response :success
  end

  test "should get index" do
    get user_index_url
    assert_response :success
  end

  test "should get new_user_page" do
    get user_new_user_page_url
    assert_response :success
  end

  test "should get new" do
    get user_new_url
    assert_response :success
  end

end
