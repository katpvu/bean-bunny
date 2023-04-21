class User < ApplicationRecord
  has_secure_password

  # validations
  validates :username, length: { in: 3..30 }, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :session_token, presence: true, uniqueness: true

  before_validation :ensure_session_token


  # associations

  # SPIRE
  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    # return matching user if password is correct; else return falsey value
    user&.authenticate(password) # authenticate instance method is defined by has_secure_password
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

  private
  def generate_unique_session_token
    loop do
      token = SecureRandom.base64
      break token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
