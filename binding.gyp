{
  "targets": [
    {
      "target_name": "xcase",
      "sources": [
        "xcase.cc",
      ],
      "include_dirs": ["<!(node -e \"require('nan')\")"]
    }
  ]
}
