

# My Solution Journey

I try to present my process below in chronological order. Truthfully, I am a little embarrassed at how scattered and random the process was and some of the suboptimal design decisions I made along the way. Likely any problem that involves research, unknowns and many choices ends up being somewhat scattered when produced chronologically like this. I suppose that's why we refactor, but I also think this is an interesting practice in self awareness and presents an opportunity to improve.

## First Thoughts

When initially looking at the problem it occurred to me that there were a few problems that needed to be solved:
1) I needed to track where the images were being dropped after being dragged
2) I needed to make the images move with the mouse as I dragged them
3) I needed to figure out a way to validate the location that I was dropping the images against the correct location

To tackle number 1 my immediate thought was to do onMouseDown and onMouseUp event handlers because I had used these before. My first thought to make the images follow the mouse was to use an animation library I had used before and track my mouse movements. I decided to initially manually test and find the correct location for the dots. I was not thrilled about this solution but I did not immediately come up with anything better and I needed to get this part to validate the rest.
At this moment I had a random and fleeting worry about how the dot would look at the end if it was placed correctly: would it awkwardly snap to the absolute correct position? I thought it might be worth doing a smooth transition to the correct spot. I was aware that there needed to be some tolerance for a "correct" drop for any consistent performance, but of course the dot needed to end up in the perfect location.  Finally, I decided I wanted to use css on the initial dots such that dragging one did not disturb the others, at this point I started using position: absolute for the dots' css.

## Diving In and Manual Validation

**Doing some research**  
Before I began to really implement anything using onMousedown and onMouseUp I decided it was prudent to do research on how this is frequently implemented. I found the Vuedraggable library and the HTML drag and drop API. I decided against using Vuedraggable because I did not want to use a library to take away from the problem as mentioned in the handout. I began to experiment with the HTML 5 drag and drop api.

**Dynamic CSS Rendering**  
At this point I was comfortable using absolute positioning for much of the problem but I started thinking about making the absolute positioning being generated based off of the properties of the images rather than manually making things be in the right place. I began to look into how to get these properties. I wanted to generate the initial layout of the dots from the width of the logo and I wanted my drop location tolerance to be equal to the radius of the dot so that as long the dot was at all overlapping the exact right spot the drop would be correct.

**Images needed to load**  
Getting dimensions from images proved not 100% straightforward because they had to be loaded in order to access their properties.

**Two Black Dots**  
At this point I began to see that there was some complexity added by having two black dots that could go in either of two spots. I gave all of the images ids so they could be referred to specifically.

**Validating DragEnd and Absolute Positioning approach**  
I then manually used the dragEnd hook to determine the correct drop spot for each location. I saw that dragEnd had an X and Y coordinate.
I knew that there needed to be some tolerance for drop location so I decided to have an algorithm where the location needed to be between a max and min for both its y and x coordinates. I also saw that black had two possible coordinate ranges so I had my algorithm take in an array. I changed the shape of the data to have the array higher up than I initially had it because it was easier to iterate over a block of code than to execute a block that has multiple loops.
Inputting my manually found values I validated that my algorithm for determining drop correctness worked albeit with some exceptions related to the black dots that I explored later. To an extent I had prototyped initial problems 1 and 3.

## Prototyping

**Using Inspect Element to get the perfect position**  
My previous drop zone validation work was not precise enough to tell me what the perfect final location was that the dots should end in. I opened up DevTools and manually edited the absolute positioning data until the circles were perfectly centered and recorded those numbers. These numbers became the final position and styling that the dots would snap to if correct.

**Snap to Absolute Positioning and handleDrag vs default behavior**  
Without doing anything, the browser gives you a shadow of the item you are dragging around. Updating my dots' position with every drag required re-rendering on every drag event, and there were a tremendous amount. Because of these facts I decided it was best just to go with the browser drag preview. The only problem with this was that the default behavior has the preview snap back to its original position on drag end. If the drop was in the right place the dot would then appear back where it had been dragged to, ultimately looking terrible. As such I spent some time (an annoying amount) figuring out how to not do this and ultimately added in ```ondragover="event.preventDefault()"``` which makes the image not snap back. Now that the image did not snap back and just clicked into place I saw that this was not jarring and my initial random fear was unfounded. Fortunately, doing less was more in this case.

**Handling Black Dot Complexity**  
I added Ids to the correct position data to help distinguish between the two different locations the black dots could end up and determine if a position had been filled. I then added this to my correctness algorithm so that two black dots could not end up in the same place.

**Drag Click Offsets**  
At this point I noticed that the dragEnd hook reported your cursor's location and was not representative of where it appeared your dragged dot would be dropped as you could click and drag from the center or any corner of the dot and the offset from the cursor would remain. This presented a bit of a User Experience problem because I wanted the user to feel like they were actually dragging the dot to a specific spot. I knew that I would eventually need to use this cursor offset in the correctness algorithm to determine if the dot, not the cursor, had been dragged to the right place. I handle this later and will explain what I did then.

**Reset Button**  
I added in saving the initial location data separately so that it could be referenced when clicking reset.

## Refining

**Centering and using relative absolute positioning**  
I was unsatisfied that the whole app was haphazardly placed on the left side of the screen. I centered the app by centering the incomplete logo image and then generating every absolute position and style at the same position relative to that image as before. I prefer both the look of the centered logo and the app being less hardcoded.

**Drag click Offset implementation**  
At this point I decided I needed to bite the bullet and implement the drag click offset to accurately determine where a dot had been dropped. I initially wanted to use the pythagorean theorem / 45-45 right triangles to find the click offset from the center of the dot using the initial click offset from dragStart. I almost immediately realized I was over-complicating this because the final relative absolute position css that I had recorded and was going to use referred to the location of the top left corner of the dot as well. This means that I would have to translate the coordinates to be centered on the dot center and then back out to where they started. Leaving the coordinate system to use the upper left corner of the origin meant I was able to do none of this translating, despite the fact that it is harder to think about the dots visual location by using their upper left corner as the origin. I then added this offset to the correctness algorithm.

**Handle dragEnd accuracy and handleDrag hack**  
Once I was sure I had implemented the drag click offset correctly I expected the correctness logic to be complete and the project to work consistently. Unfortunately, the readings coming from the coordinates of dragEnd were very inconsistent. I scoured over the properties on the event but was unable to find a set of properties that could combine or be individually used to consistently locate the dragEnd. At this point one option I had was to make my correctness tolerances very wide so that there were no false negatives but create what I believed to be too tolerant a correct drop zone. I found this unacceptable and generally not good enough, also this would completely defeat the purpose of using the radius for drop tolerance or the work I just did to incorporate the click offSet. I looked into bringing back the onMouseUp event handler but was having inconsistent firings while ending a drag. Ultimately, I went with recording the current location while dragging using handleDrag and then onDragEnd using that location as it would stop updating when the dragEnd and so the recorded current position was implicitly where the drag had ended. I am not thrilled with the solution because I am updating data very rapidly when I only need the last update.

**Refactoring to use Computed More**  
I began to refactor my variable styles and positions that were consistently defined the same way to be computed properties rather than updating the state with a function. Functionally, these things were almost identical but it was wasteful to have to define and call a function when computed handles these updates.

## Finishing Up and Refactoring

**Allow black swap**  
The way I had implemented the solution up to this point allowed for the user to move one black dot from one possible correct location to the other but would then block that previous location from being accessed. I updated my solution to track which dots are filling which positions and to allow for this swap to take place. Truthfully, I am ambivalent to allowing swapping at all, the other option is to simply not allow dragging when the dot is placed, this would produce a more consistent experience across the dots as the other dots cannot swap due to not having two correct locations.

**handleResize**  
It had been bothering me throughout this process that if I opened and closed dev tools my project would break because the absolute location of the center of the screen would change. I also feel handling screen resizing was important to the completeness of the project. Nothing the user could do using the normal browser GUI should break the project including screen resizing. Currently, the app should be resilient unless the user makes the screen thinner than the empty-logo image. Much of this was handled by refactoring to computed values that updated when their "input" data changed. I had to keep the offSet values as data that I manually updated because these did not seem to trigger computed re-loads. I also needed to add awareness of where each dot was from the dots' perspective so that I could update the dots' location to be either the newly defined correct or newly defined initial location. I could have computed this from the existing positions filled data but I thought it was easier to reference a new object called dotLocations. Generally, I tried to reduce redundantly defined (normalize) data unless it was simply easier to maintain and reference copies.

**Title and Scroll Bug**  
I added a title to the app which pushed the bottom of the empty logo image off of the un-scrolled screen. This unveiled a bug: I was not handling scrolling. This is important because screens with lower pixel density than mine may have needed to scroll already. The app would not have worked properly on these screens. I added accounting for the vertical scroll location to the correctness algorithm to fix this bug.

**User Feedback**  
I added in some user feedback that shows up just below the title that gives positive feedback when the drop is correct, negative when wrong, and lets the user know when they have completed the task. I used red and green as these are commonly associated with correct and incorrect and changing colors for done as this felt festive and congratulatory.

**Mostly Abandoning style generated based on image attributes**  
Ultimately, I decided to just use the number that I would get from looking up the image attributes because this is a fixed value and looking up those attributes when they do not change is unnecessary complexity. I also abandoned using the dots' radius as the correctness tolerance because the number I settled on felt more correct when actually used. Also, after more thought I decided that it is reasonable that a user may expect the drop to occur where the cursor is and I would like to have some extra tolerance for this GUI interpretation.



