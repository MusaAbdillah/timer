class Timer extends React.Component {

    render() {
        if (this.props.timeLeft == 0) {
            console.log("are you here?");
            document.getElementById("end-of-time").play();
        }

        if (this.props.timeLeft == null || this.props.timeLeft == 0) return React.createElement("div", null);
        return React.createElement(
            "h1",
            null,
            "Time Left: ",
            this.props.timeLeft
        );
    }
}

class Button extends React.Component {

    startTimer(event) {
        return this.props.startTimer(this.props.time);
    }

    render() {
        return React.createElement(
            "button",
            {
                type: "button",
                className: this.props.time % 2 != 0 ? "btn btn-primary" : "btn btn-secondary",
                onClick: () => {
                    this.props.startTimer(this.props.time);
                } },
            this.props.time,
            " seconds"
        );
    }
}

class TimerWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: null,
            timer: null
        };
        this.startTimer = this.startTimer.bind(this);
    }

    startTimer(timeLeft) {
        clearInterval(this.state.timer);
        let timer = setInterval(() => {
            var timeLeft = this.state.timeLeft - 1;
            console.log("===================");
            console.log(timeLeft);
            console.log(timeLeft == 0);
            console.log(timer);
            console.log("===================");
            if (timeLeft == 0) clearInterval(timer);
            this.setState({ timeLeft: timeLeft });
        }, 1000);
        return this.setState({ timeLeft: timeLeft, timer: timer });
    }

    render() {
        return React.createElement(
            "div",
            { className: "row-fluid" },
            React.createElement(
                "h2",
                null,
                "Timer"
            ),
            React.createElement(
                "div",
                { className: "btn-group", role: "group" },
                React.createElement(Button, { time: "5", startTimer: this.startTimer }),
                React.createElement(Button, { time: "10", startTimer: this.startTimer }),
                React.createElement(Button, { time: "15", startTimer: this.startTimer }),
                React.createElement(Button, { time: "20", startTimer: this.startTimer })
            ),
            React.createElement(Timer, { timeLeft: this.state.timeLeft }),
            React.createElement("audio", { id: "end-of-time", src: "flute_c_long_01.wav", preload: "auto" })
        );
    }

}

ReactDOM.render(React.createElement(TimerWrapper, null), document.getElementById("timer-app"));
