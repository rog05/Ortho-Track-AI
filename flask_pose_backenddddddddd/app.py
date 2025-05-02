
from flask import Flask, render_template
from pose_module.camera_pose import run_pose_tracking

app = Flask(__name__)

@app.route("/")
def home():
    return "<h2>Welcome to Pose Tracker</h2><p>Try: /track/squats or /track/jumping_jacks</p>"

@app.route("/track/<exercise>")
def track(exercise):
    run_pose_tracking(exercise)
    return "Session completed. Close camera window."

if __name__ == "__main__":
    app.run(debug=True)
