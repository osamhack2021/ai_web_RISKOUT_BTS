from functools import wraps
import errno
import os
import signal

class TimeoutError(Exception):
    def __init__(self, error_msg):
        self.msg = f"Timeout error occured : {error_msg}"

    def __str__(self):
        return self.msg


def timeout(seconds=20, error_message=os.strerror(errno.ETIME)):
    def decorator(func):
        def _handle_timeout(signum, frame):
            raise TimeoutError(error_message)

        def wrapper(*args, **kwargs):
            signal.signal(signal.SIGALRM, _handle_timeout)
            signal.setitimer(signal.ITIMER_REAL,seconds)
            try:
                result = func(*args, **kwargs)
            finally:
                signal.alarm(0)
            return result
        return wraps(func)(wrapper)
    return decorator
