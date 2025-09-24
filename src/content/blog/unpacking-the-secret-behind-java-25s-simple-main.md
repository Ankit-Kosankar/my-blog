---
title: Unpacking the Secret Behind Java 25's Simple main()
description: Java 25 The working of simple syntax for main() method.
pubDate: 2025-09-23T18:13:01.932Z
updatedDate: 2025-09-23T18:13:01.942Z
heroImage: ""
---
For Years Java Developers had to write 
```
public static void main(String[] args) 
{
 System.out.println("Hello Java!");
}
```
Miss one and your code wouldn't run.

But in java 25, It just changed now , running a method is as siimple as 
write just a main() method 
```
 example.java
 main()  {
  IO.println("Hello Java");
 }
```

Yes this is valid ,
But In 
Java we need a class to run the code ?
What happened to all the keywords - public static void ?
what happened to the method arguments  - main(String[] args)?

- you can run java programs without compiling first 
  javac example.java
  What this will do is compile the code on the fly and run 
  the generated class.
  In Java 25 code the compiler still adds the class even though you did not create    
  class compiler creates one for you to run your main() method

- instance main method : 
  what this means is now java main method can be a part of Object.
  you don't require the static keyword to make it part of the class
  Java Launcher i.e javac or java can run the main() method .

- java still needs the main() - this is still then entry point of the 
  program 
  now you dont require the method arguments
  ```
  main() 
  main(String[] args)
  ``
  Both are valid syntaxes
 
- 
you can inspect the bytecode of your generated classfile using
javap  command
you will see that 

```
Compiled from "example.java"
final class example {
  example();
  void main();
}
```
the class with the java filename and 
the constructor 
is added by the compiler as you can see.



 