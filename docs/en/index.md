## Files Overview

```txt
.github ----> github Action config
.vscode ----> vscode config(prettier)
  src   ---|
           |
           |
         context    ---> global context (Inject Page Context)
         model      ---> model layer
         controller ---> controller layer (Controller Service)
         pages      ---> view layer (UI View)
         theme      ---> theme .scss file
```

## Framework

```txt
        Model ---- Update --> View
          ↑                     |
        Change              Interactive
          |                     |
          <————— Controller —————
```

## Project layer

```txt
         ______________________
        |       Project        |
        |   ________________   |
        |  |  Page |  Page |   |
        |  | _____ | _____ |   |
        |  || Node||| Node||   |
        |  ||_Node_||_Node||   |
        |  |_______|_______|   |
        |______________________|
```

## Features

- Keyboard Event ✅
  - [Ctrl + c] (Copy Select)
  - [Ctrl + v] (Paste Select)
  - [Ctrl + Backspace] (Delete Select)
  - [Ctrl + z] (Step Back)
  - [Ctrl + y] (Step Forward)
- Multi Page ✅
- Layout ✅
- History Operation ✅
- Visual Component ✅
- Visual Styles
- Export Code
- History
