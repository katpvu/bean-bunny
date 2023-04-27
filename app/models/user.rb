# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  email           :string
#
class User < ApplicationRecord
  has_secure_password

  # validations
  validates :username, 
    length: { in: 3..30 }, 
    uniqueness: true,
    format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email"}
  validates :password, 
    length: { minimum: 6 }, 
    allow_nil: true
  validates :session_token, 
    presence: true, 
    uniqueness: true
  validates :email, 
    presence: true, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: {with: URI::MailTo::EMAIL_REGEXP}

  before_validation :ensure_session_token


  # associations
  has_many :lists,
    dependent: :destroy

  # SPIRE
  def self.find_by_credentials(credential, password)
    field = credential =~  URI::MailTo::EMAIL_REGEXP ? :email : :username
    user = User.find_by(field => credential)
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
