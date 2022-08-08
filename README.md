# My Solution Journey

I try to present my process below in chronological order. Truthfully, I am a little embarassed at how scattered and random the process was and some of the suboptimal design decsions I made along the way. Likely any problem that involves reseach, unknowns and many choices ends up being somewwat scattered when produced chronologically like this. I suppose that's why we refactor, but I also think this is an interesting practice in self awareness and presents oppurtunity to improve.

## First Thoughts

When initially looking at the problem it occurred to me that there were a few problems that needed to be solved:
1) I needed to track where the images were being dropped after being dragged
2) I needed to make the images move with the mouse as I dragged them
3) I needed to figure out a way to validate the location that I was dropping the images against the correct location

To tackle number 1 my immediate thought was to do onMouseDown and onMouseUpEvent handlers because I had used these before. My first thought to make the images follow the mouse was to use an animation library I had used before and track my mouse movements. I decided to initially manually test and find the correct location for the dots. I was not thrilled about this solution but I did not immediately come up with anything better and I needed to get this part to validate the rest. 
At this moment I had a random and fleeting worry about how the dot would look at the end if it was placed correctly: would it awkwardly snap to the absolute correct position? I thought it might be worth doing a smooth transition to the correct spot. I was aware that there needed to be some tolerance for a "correct" drop for any consistent peformance, but of course the dot needed to end up in the perfect location.  Finally, I decided I wanted to use css on the initial dots such that dragging one did not disturb the others, at this point I started using position: absolute for the dots' css.

## Diving In and Manual Validation

#####Doing some research
Before I began to really implement anything using onMousedown and onMouseUp I decided it was prudent to do research on how this is frequently implemented. I found the Vuedraggable library and the HTML drag and drop API. I decided against using Vuedraggable because I did not want to use a library to take away from the problem as mentioned in the handout. I began to experiment with the HTML 5 drag and drop api.

####Dynamic CSS Rendeering
At this point I was comfortable using absolute positioning for much of the problem but I started thinking about making the absolute positioning being generated based off of the properties of the images rather than manually making things be in the right place. I began to look into how to get these properties. I also wanted to 

####Images needed to load
Getting dimensions from images proved not 100% straightforward because they had to be loaded in order to access their properties.

####Two Black Dots
At this point I began to see that there was some complexity added by having two black dots that could go in either of two spots. I gave all of the images ids so they could be referred to specifically.

####Validating DragEnd and Absolute Positioning approach
I then manually used the dragEnd hook to determine the correct drop spot for each location. I saw that dragEnd had an X and Y coordinate.
I knew that there needed to be some tolerance for drop location so I decided to have an algorithm where the location needed to be between a max and min for both its y and x coordinates. I also saw that black had two possible coordinate ranges so I had my algorithm take in an array. I changed the shape of the data to have the array higher up than I initially had it because it was easier to iterate over a block of code than to execute a block that has multiple loops.
Inputting my manually found values I validated that my algorithm for determining drop correctness worked albeit with some exceptions related to the black dots that I explored later. To an extent I had prototyped initial problems 1 and 3.

## Prototype

##Using Inspect Element to get the perfect position
My previous drop zone validation work was not precise enough to tell me what the perfect final location was that the dots shoudld end in. I opened up DevTools and manually edited the absolute positioning data until the circles were perfectly centered and recorded those numbers 

##Snap to Absolute Positioning and handleDrag vs default behaviour
Without doing anything, the browser gives you a preview of the drag location of the item you are dragging around. Updating my dots position with every drag required re-rendering every drag event, and there were a tremendous amount. With this I did not feel like it was necessary to update my dots' positions along with the drag 

##

##Drag click offsets
I noticed that that the drag


```bash
npm run dev
```

## Refactoring

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

