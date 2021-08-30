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

## Features

- Support Keyboard Event ✅
  - [Ctrl + c] (Copy Select)
  - [Ctrl + v] (Paste Select)
  - [Ctrl + Backspace] (Delete Select)
  - [Ctrl + z] (Step Back)
  - [Ctrl + z] (Step Forward)
- Support Multi Page ✅
- Support Layout ✅
- Support History Operation ✅
- Support Visual Component
- Support Visual Styles
- Support Export Code
- Support Css unit (Rem, Vw)
- Support History
