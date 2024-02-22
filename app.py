from flask import Flask, render_template
import mimetypes

mimetypes.add_type('text/css', '.css')
mimetypes.add_type('text/javascript', '.js')

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/app')
def qrcodescanner():
    return render_template("qrcodescanner.html")


if __name__ == '__main__':
    app.run()
