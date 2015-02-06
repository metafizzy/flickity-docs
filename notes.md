<!-- AWS account -->
<!-- flickity.metafizzy.co subdomain -->
<!-- hover.com account -->
<!-- re-direct flickityjs.com -->
<!-- Texta font -->
<!-- font-sizes in em -->
<!-- mobile hero gallery -->
<!-- GitHub link -->
<!-- copy assets to build/ -->
<!-- copy flickity files to build/ -->
<!-- dev build -->
  <!-- don't copy fonts -->
  <!-- list out all sources -->
<!-- figure out s3cmd -->
<!-- tag version 0.1.0, npm publish -->

document how to style prev/next button :focus, when removing outline

document :focus

    .flickity-enabled:focus .flickity-viewport {
      outline: thin dotted;
      outline: 5px auto -webkit-focus-ring-color;
    }

is-selected cell
is-pointer-down when dragging

title id's
page nav

getting the clicked cell element

cdnjs

how to use imagesLoaded with RequireJS / Browserify
How to use sync with RequireJS / Browserify

export footer

## IA

Home
  Commercial license
  Featured options
  Images
Style
  Cells
  Previous & next buttons
  Page dots
  Gallery
Options
Events
Methods
Extras
  Custom page navigation
  RequireJS
  Browserify
  Video
  Angular
License


### methods

**selecting cells**
select
previous
next

**adding and removing cells**
prepend
insert
append
remove

**size and position**
resize
positionCells

**events**
on
off
once

**utilities**
destroy
reloadCells
getSelectedCellElement
getCellElements
jQuery.fn.data('flickity')
Flickity.data()


### properties

Flickity.x
Flickity.selectedIndex
Flickity.cells
Flickity.slideableWidth

Cell.x

### events

staticClick
pointerDown
pointerMove
pointerUp
dragStart
dragMove
dragEnd
settle
cellSelect

### options

**setup**
cellSelector
initialIndex
accessibility
resizeBound

**cell position**
cellAlign
contain
imagesLoaded
percentPosition
rightToLeft

**dragging**
draggable
freeScroll
touchVerticalScroll

**behavior**
wrapAround
autoPlay
watchCSS
sync

**UI**
prevNextButtons
pageDots

## Blog about

Instead of ordering content alphabetically, order it by similar groups. Make a story of out it

---

<div class="example duo">
  <div class="example__code duo__cell">
  </div>
  <div class="example__demo duo__cell">
    <div class="gallery">
      <div class="gallery-cell"></div>
      <div class="gallery-cell"></div>
      <div class="gallery-cell"></div>
      <div class="gallery-cell"></div>
      <div class="gallery-cell"></div>
    </div>
  </div>
</div>
