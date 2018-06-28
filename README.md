# Gruntfile

My personal [Gruntfile][] for web development. In fact, the main objective of writing this **README** is reminding me of using it instead of helping you how it works :relieved:. Since it's written for myself, the content can be as simple as possible. I find a good excuse for my laziness :)

### Devel

```bash
grunt devel
```

The `devel` task will process files in your work directory and place results in the `build/devel` folder. The mapping as follows:

![Devel](readme/devel.svg)

A frameless rectangle represents a file or a directory which contains files of the same kind, and a rectangle with a border represents a grunt task. 

[Gruntfile]: https://gruntjs.com/sample-gruntfile
