// logger.cc
#include <string>
#include <iostream>
#include <node.h>

namespace demo {

using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Persistent;
using v8::String;
using v8::Value;
using v8::Array;
using v8::Exception;
using v8::Handle;

// Logging function for objects
void Log(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  if(args.Length() < 1 || !args[0]->IsObject()) {
    isolate->ThrowException(Exception::TypeError(
    String::NewFromUtf8(isolate, "Error: One object expected")));
    return;
  }
  Local<Context> context = isolate->GetCurrentContext();
  Local<Object> obj = args[0]->ToObject(context).ToLocalChecked();
  Local<Array> props = obj->GetOwnPropertyNames(context).ToLocalChecked();
  Handle<Array> array =  Handle<Array>::Cast(obj->Get(String::NewFromUtf8(isolate,"Price")));
  int length = array->Length();
  for(int x=0;x<length;x++){
      v8::Local<Value> val = array->Get(x); 
      std::string ele =  *String::Utf8Value(val);
      std::cout << val->NumberValue() << "\n";
  };
  for(int i = 0, l = props->Length(); i < l; i++) {
    Local<Value> localKey = props->Get(i);
    Local<Value> localVal = obj->Get(context, localKey).ToLocalChecked();
    std::string key = *String::Utf8Value(localKey);
    std::string val = *String::Utf8Value(localVal);
  };

}

void CreateFunction(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, Log);
  Local<Function> fn = tpl->GetFunction();
  // omit this to make it anonymous
  fn->SetName(String::NewFromUtf8(isolate, "loggerFunction"));
  args.GetReturnValue().Set(fn);
}

void Init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", CreateFunction);
}

NODE_MODULE(logger, Init)

}  // namespace demo