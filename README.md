# To-do List

In this project, after learning advanced JS and a few design patterns we will be using it to create dynamic to-do lists with multi level projects each having their individual lists.

Skills learnt before starting the project are :
1. Module and constructor patterns, factory functions.
2. Webpack and bundling.
3. OOP principles and how to structure projects.
4. Advanced JS concepts such as scopes, closures and prototypical inheritance.

## The implementation

I divided the project into three basic modules

1. The DOMController which essentially does all DOM related controls and is the brain of the operation.
2. The ItemFunctions, responsible for keeping a track of the item data and object control.
3. The ProjectFunctions, in similar vein to ItemFunctions but for Project Data.


<br>
A very basic implementation has been done here with minimal features as the focus was to get used to trying and making the code more object oriented and getting used to doing a webpack setup for bundling. The current project does.

* Highlights projects selected and top of the order.
* Has Priority sorting and highlighting for items.
* Button disable for item adding (Does not allow you to add an item unless a project is created.)
* Requires all inputs and has defaults set in case of any issues.


The UI is not up to par and has only been fixed for layout and nothing else. The decision to temporarily discontinue working on this project was to focus on advanced JS and the initial class implementations has become too big to refactor without building it from the ground up. Another learning experience from this is to plan the layout and not approach the problem as one big problem statement.