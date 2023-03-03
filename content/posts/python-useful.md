---
title: Collection of useful Python stuff
description: Pieces of code that I made and that I use often and that I find useful.
updatedAt: "2022-09-23"
categories: [
  "Python"
]
author: "Théo Bori"
---

# ~

Here are some pieces of code that I have done in Python and that I use quite often in my projects.

# Collection

### Repeater

```python
import threading
from typing import Callable

class RepeatCall:
    """
        Optimized object that will call a function every n seconds
    """

    def __init__(
      self, n: float,
      callback: Callable,
      *args: list, **kwargs: dict
    ):
        self._timer = None
        self.n = n
        self.callback = callback
        self.args = args
        self.kwargs = kwargs
        self.callback(*self.args, **self.kwargs)
        self.is_running = False

        self.start()

    def _run(self):
        """
            Call the function
        """

        self.is_running = False
        self.start()
        self.callback(*self.args, **self.kwargs)

    def start(self):
        """
            Start the reapeater
        """

        self._timer = threading.Timer(self.n, self._run)
        self._timer.start()
        self.is_running = True

    def stop(self):
        """
            Cancel the thread, then it stops the "loop"
        """

        self._timer.cancel()
```

### Checking bytes (used for file signature)

```python
def signature_check(data: bytes, sig: bytes) -> bool:
    """
        Check file signature
    """

    return data[:len(sig)] == sig
```

### Fill lists

```python
from typing import Tuple, List, Any

def fill_min(*args: Tuple[List[Any]]) -> List[Any]:
    """
        Set every list with the same length
    """

    length = len(max(*args, key=len))
    args = list(args)
    
    for i in range(len(args)):
        args[i] += (length - len(args[i])) * [" "]

    return args
```

### Create a list of list from a list

```python
from typing import List, Any

def make_groups(arr: List[Any], size: int) -> List[List[Any]]:
    """
        Makes list of iterable with a constant size
    """

    return [arr[i:i + size] for i in range(0, len(arr), size)]
```

### Key value system object + manager

```python
from typing import Union, Any, Callable

class Bind:
    """
        Describing combination (key -- callback)
    """

    def __init__(
        self,
        key: Any,
        callback: Callable, *args: list, **kwargs: dict
    ):
        self.key = key
        self.callback = callback
        self.args = args
        self.kwargs = kwargs

    async def try_call(
        self,
        *additional_args: list, **additional_kwargs: dict
    ) -> Any:
        """
            Tries to call the stored function
        """

        args = [*self.args, *additional_args]
        kwargs = {**self.kwargs, **additional_kwargs}

        try:
            ret = await self.callback(*args, **kwargs)
        except:
            ret = self.callback(*args, **kwargs)

        return ret

class Binds:
    """
        Manages the Bind objects
        hotkey --> function
    """

    def __init__(self):
        self.key_binding = {}

    def __getitem__(self, key: Any) -> Union[Bind, None]:
        if not key in self.key_binding.keys():
            return None

        return self.key_binding[key]

    def add_bind(
        self,
        key: Any,
        function: callable, *args: list, **kwargs: dict
    ):
        """
            Add a Bind to the dictionnary
        """

        bind = Bind(key, function, *args, **kwargs)

        self.key_binding[key] = bind

    async def try_call_from_bind(
        self,
        key: Any,
        *add_args: list, **add_kwargs: dict
    ) -> Any:
        """
            If the dictionnary key is found,
            then it tries to call the associated function
        """

        bind = self[key]

        if not bind:
            return False

        return await bind.try_call(*add_args, **add_kwargs)
```
