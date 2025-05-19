# BookStore-API

Setup

'''bash
git clone https://github.com/07Abhinav/BookStore-API.git
cd BookStore-API
'''

Install Dependencies

'''bash
npm i
'''

Start server

'''bash
node server.js
'''

API Testing

Auth API's

Signup

Method POST
'''bash
http://localhost:5000/auth/signup
'''

JSON
'''bash
{
  "username": "Any name",
  "password": "Your Password"
}
'''

Login

Method POST
'''bash
http://localhost:5000/auth/login
'''

JSON
'''bash
{
  "username": "Any name",
  "password": "Your Password"
}
'''
It will return a token

Book API's

Add Book

Method POST
'''bash
http://localhost:5000/books
'''

Headers:

Authorization: Bearer <your_token_here>

JSON
'''bash
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "description": "A novel set in the Jazz Age"
}
'''

Get All Books (Paginated + Filtered)
Method: GET

URL: http://localhost:5000/books?author=F. Scott Fitzgerald&genre=Fiction&page=1&limit=5

Get Book By ID
Method: GET

URL: http://localhost:5000/books/<book_id_here>

Review API's

Add Review

Method POST
'''bash
http://localhost:5000/books/<book_id_here>/reviews
'''

Headers:

Authorization: Bearer <your_token_here>

JSON
'''bash
{
  "rating": 5,
  "comment": "A masterpiece of literature!"
}
'''

Update Review

Method PUT
'''bash
http://localhost:5000/reviews/<review_id_here>
'''

Headers:

Authorization: Bearer <your_token_here>

JSON
'''bash
{
  "rating": 4,
  "comment": "Actually, it could be shorter."
}
'''

Delete Review

Method DELETE
'''bash
http://localhost:5000/reviews/<review_id_here>
'''

Headers:

Authorization: Bearer <your_token_here>