#!/usr/bin/env python

"""convert module"""

import re
import os
from uuid import uuid4

from md2gemini import md2gemini
from typing import Any
from enum import Enum
from sys import argv, stderr, stdout

class Document(Enum):
    """
        Every available document formats
        
        Keys are link to the documents extensions
    """
    
    GEMINI = "gmi"
    GOPHER = "gph"

METADATA_REGEXS = {  
    "title": (
        re.compile(rf"(title):\s+(.+)\n"),
        str
    ),
    "description": (
        re.compile(rf"(description):\s+(.+)\n"),
        str
    ),
    "updated_at": (
        re.compile(rf"(updatedAt):\s+(.+)\n"),
        str
    ),
    "categories": (
        re.compile(rf"(categories):\s+\[(.+)\]", re.DOTALL),
        list
    ),
    "author": (
        re.compile(rf"(author):\s+(.+)\n"),
        str
    )
}

BLOCK_RE = "```%s[\\s\S]*?```"

class PostMetadata:
    """
        Store the post metadata like title,
        description, etc...
    """

    def __init__(self, data: str = None):
        # Data to parse
        self.src = data
        
    def parse(self):
        """
            Parse `self.src`
            
            It must have the same header than posts
            in `content/posts/`
        """
        
        if not self.src:
            return

        for k, (regex, _type) in METADATA_REGEXS.items():
            match = re.findall(regex, self.src).pop()
        
            if len(match) != 2:
                continue
    
            (_, value) = match
            
            value = value.replace("\n", "")

            match _type.__name__:
                case "list":
                    value = "[" + value + "]"
                    
                    self.__setattr__(k, eval(value))
                case "str":
                    value = value.replace("\"", "")
                    self.__setattr__(k, value)
                case _:
                    raise Exception("Invalid metadata type")
        
class PostConvert:
    """
        Abstract class to convert a post
        from `content/posts/` to another
        document format
    """
    
    def __init__(self, document: Document):
        self.document = document
        self.data = None
        self._f = stdout
        self._metadata = PostMetadata()
        
    def set_f(self, f=stdout):
        """
            Change the file descriptor
        """
        
        self._f = f
    
    def print(self, *args, **kwargs):
        """
            Wrapping the print function to use
            `self._f` as the default file descriptor
        """
        
        print(*args, **kwargs, file=self._f)
    
    def __pre_parse(self, data: str=None) -> bool:
        """
            Parse the post
            
            Split the header and the main content
        """
        
        if not data:
            return False

        data = data.split("---")
        data = list(
            filter(
                lambda x: x != "",
                data
            )
        )
        
        if len(data) != 2:
            return False
        
        self.data = data.pop()
        self._metadata.src = data.pop()
        
        return True
    
    def load(self, data: str):
        """
            Load data
        """
        
        if not self.__pre_parse(data):
            raise Exception("Unable to parse this data")
    
    def load_from_file(self, filepath: str):
        """
            Set data from a file
        """
        
        with open(filepath, "r") as f:
            self.load(f.read())
    
    def parse(self):
        """
            Parse
        """
        
        self._metadata.parse()
    
    def _metadata_dump(self):
        """
            Dump the metadata aka the header
        """
        
        raise Exception("Not implemented !")

    def dump(self):
        """
            Dump the entire document into the given format
        """

        raise Exception("Not implemented !")
    
    def parse_and_dump(self):
        """
            Parse then dump
        """
        
        self.parse()
        self.dump()

class GeminiConvert(PostConvert):
    """
        Convert into the gemini format
    """
    
    HTML_RE = re.compile(rf"{BLOCK_RE}" % "html")
    
    def __init__(self):
        super().__init__(Document.GEMINI)
        
    def parse(self):
        super().parse()
        
        self.dest = md2gemini(self.data)

        html_blocks = re.findall(
            GeminiConvert.HTML_RE,
            str(self.dest)
        )

        for block in html_blocks:
            self.dest = self.dest.replace(block, "")

        self.dest = self.dest.replace("**", "")
        
        tmp = str(uuid4())
        self.dest = self.dest.replace("```", tmp)
        self.dest = self.dest.replace("`", "")
        self.dest = self.dest.replace(tmp, "```")

    def _metadata_dump(self):
        self.print("# " + self._metadata.title)
        self.print("## " + self._metadata.description)
        self.print("### ", " - ".join(self._metadata.categories))
        self.print(
            "By " + self._metadata.author + 
            ", edited " + self._metadata.updated_at
        )
    
    def dump(self):
        self._metadata_dump()
        self.print(self.dest)

class GopherConvert(PostConvert):
    """
        Convert into the gopher format
    """
    
    def __init__(self):
        super().__init__(Document.GOPHER)
    
    def parse(self):
        super().parse()

    def _metadata_dump(self):
        self.print(self._metadata.title)
        self.print(self._metadata.description)
        self.print(" - ".join(self._metadata.categories))
        self.print("By " + self._metadata.author) 
        self.print("Last edit: " + self._metadata.updated_at)
        self.print("---------------------")
    
    def dump(self):
        self._metadata_dump()

TO_CONVERT = {
    Document.GOPHER: GopherConvert,
    Document.GEMINI: GeminiConvert
}

class PostsConvert:
    """
        Converting a bunch of posts
    """
    
    def __init__(self, dir: str, _type: PostConvert):
        self.__dir = dir
        self.__type = _type
    
    def dump_to_files(self, dest_dir: str):
        """
            Parse then write into file
        """
        
        for root, _, files in os.walk(self.__dir):
            for file in files:
                path = os.path.join(root, file)
                converter = self.__type()
                
                converter.load_from_file(path)
                
                dest = file.replace(
                    ".md",
                    "." + converter.document.value
                )

                f = open(
                    dest_dir + "/" + dest,
                    "w+"
                )
                
                # converter.set_f(f)
                converter.parse_and_dump()

def main():
    av = argv[1:]
    
    available_exts = tuple(
        map(
            lambda x: x.value,
            list(Document)
        )
    )
    
    if len(av) < 3:
        return
   
    (ext, dir, dest_dir) = av
    
    if not ext in available_exts:
        return
    
    document = Document._value2member_map_[ext]
    converter_proto = TO_CONVERT.get(document)

    if not converter_proto:
        return
    
    try:
        a = PostsConvert(
            dir,
            converter_proto
        )
        a.dump_to_files(dest_dir)
    except Exception as error:
        print(error, file=stderr)
    
if __name__ == "__main__":
    main()
