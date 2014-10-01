var PitchCounter = (function () {
	var _parent;
	var _currentTime;
	var _active = false;
	var _interval;
	var _settings;

	var _load = function(parent, settings) {
		_parent = parent;
		_settings = settings;
		_currentTime = settings.time;
		updateOutput(_currentTime);
	};

	var _start = function() {
		_active = true;
		_interval = setInterval(function() {
			if(_currentTime == 0) {
				_reset();
			} else {
				--_currentTime;
				updateOutput();
			}
		}, 1000);
	};

	var _toggle = function() {
		if(_active) _pause();
		else _start();
	};

	var _pause = function() {
		_active = false;
		clearInterval(_interval);
		updateOutput();
	};

	var _reset = function() {
		_active = false;
		clearInterval(_interval);
		_currentTime = _settings.time;
		updateOutput();
	};

	var _setTime = function(seconds) {
		_settings.time = seconds;
		_reset();
	};

	var _getTime = function() {
		return _settings.time;
	};

	var _setThreshold = function(seconds) {
		_settings.threshold = seconds;
		_reset();
	};

	var _getThreshold = function() {
		return _settings.threshold;
	};

	var updateOutput = function() {
		if(_currentTime < _settings.threshold) {
			_parent.css("color", "red");
		} else {
			_parent.css("color", "white");
		}
		_parent.text("0" + parseInt(_currentTime / 60) + ":" + (((_currentTime % 60) < 10) ? "0" : "") + (_currentTime % 60));
	};

	return {
		load: _load,
		start: _start,
		reset: _reset,
		toggle: _toggle,
		pause: _pause,
		setTime: _setTime,
		getTime: _getTime,
		setThreshold: _setThreshold,
		getThreshold: _getThreshold
	};

})();