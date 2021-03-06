#include <node.h>
#include <iostream>
#include <string>
#include <unistd.h>
#include "uv.h"

using namespace std;

namespace correlation {
		
		using v8::Function;
		using v8::FunctionCallbackInfo;
		using v8::Isolate;
		using v8::Local;
		using v8::Null;
		using v8::Object;
		using v8::String;
		using v8::Value;
		using v8::Array;
		using v8::Handle;
		using v8::Number;
		using v8::Persistent;

		struct Work {
		  uv_work_t  request;
		  Persistent<Function> callback;
		  float autocorrelation[10000];
		  float IntradayEnd[10000];
		  int length;
		};

		static void WorkAsync(uv_work_t *req)
		{
		    Work *work = static_cast<Work *>(req->data);

		    // this is the worker thread, lets build up the results
		    // allocated results from the heap because we'll need
		    // to access in the event loop later to send back
		   

		    // Compute Autocorrelation
		    int maxTau = 365;
		    for(int tau=0; tau<maxTau;tau++){
		    	for(int t = 0;t<maxTau-tau;t++){
		    		// cout << work->IntradayEnd[t] << "\t" << work->IntradayEnd[t+tau] << "\n";
		    		work->autocorrelation[tau] += work->IntradayEnd[t]*work->IntradayEnd[t+tau];	
		    	};
		    	work->autocorrelation[tau]/=((maxTau-tau)); // Normalize Autocorrelation Function
		    };
		    float NormFactor = work->autocorrelation[0];
		  	
		    for(int i=0;i<maxTau;i++){
		   		work->autocorrelation[i]/=NormFactor;
			};
			
			//
		    // that wasn't really that long of an operation, 
		    // so lets pretend it took longer...
		    sleep(3);
		}

		// called by libuv in event loop when async function completes
		static void WorkAsyncComplete(uv_work_t *req,int status)
		{
		    Isolate* isolate = Isolate::GetCurrent();
		    v8::HandleScope handleScope(isolate); // Required for Node 4.x
		    Work *work = static_cast<Work *>(req->data);
  			Local<Array> result_list = Array::New(isolate);
			for(int x=0; x < work->length; x++){
				Local<Number> returnval = Number::New(isolate, work->autocorrelation[x]);
				result_list->Set(x, returnval);
			};

   			Handle<Value> argv[] = { result_list };
    		// execute the callback
    		
    		Local<Function>::New(isolate, work->callback)->Call(isolate->GetCurrentContext()->Global(), 1, argv);
		    
		    // Free up the persistent function callback
	    	work->callback.Reset();
	    
		    delete work;
		}


		void Correlation(const v8::FunctionCallbackInfo<v8::Value>&args){
			Isolate* isolate = args.GetIsolate();
		    //
		    // Worker Thread
		    //
		    Work *work = new Work;
    		work->request.data = work;
		
		 //   Local<Array> input = Local<Array>::Cast(args[0]);
		    
		    work->length = Local<Array>::Cast(args[0])->Length(); 
		    // work->length = input->Length();
	
 			cout << "Test Start" << "\n";
			cout << work->length << "\n";

 			// cout << work->length;
		    for(int x=0;x<work->length;x++){
		    	v8::Local<Value> end_Value = Local<Array>::Cast(args[0])->Get(x);
				//work->IntradayEnd[x] = input->Get(x);
		    	work->IntradayEnd[x] = end_Value->NumberValue();
				 
		    };

		    // cout << "Test End";
		    // store the callback from JS in the work package so we can 
		    // invoke it later
		    Local<Function> callback = Local<Function>::Cast(args[1]);
		   
		    work->callback.Reset(isolate, callback);
		    
		    // kick of the worker thread
    	 	uv_queue_work(uv_default_loop(),&work->request, WorkAsync, WorkAsyncComplete);
    		args.GetReturnValue().Set(Undefined(isolate));


		}


		void Init(Local<Object> exports, Local<Object> module) {
			NODE_SET_METHOD(module, "exports", Correlation);
		}




		NODE_MODULE(addon,Init);
}