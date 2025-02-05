'use client';

import { Button } from '@/components/plate-ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/plate-ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/plate-ui/dialog';
import { Input } from '@/components/plate-ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/plate-ui/popover';
import { cn } from '@udecode/cn';
import { CopilotPlugin } from '@udecode/plate-ai/react';
import { useEditorPlugin } from '@udecode/plate/react';
import {
  Check,
  ChevronsUpDown,
  ExternalLinkIcon,
  Eye,
  EyeOff,
  Settings,
  Wand2Icon,
} from 'lucide-react';
import { createContext, type ReactNode, useContext, useState } from 'react';

interface Model {
  label: string;
  value: string;
}

interface SettingsContextType {
  keys: Record<string, string>;
  model: Model;
  setKey: (service: string, key: string) => void;
  setModel: (model: Model) => void;
}

export const models: Model[] = [
  { label: 'gpt-4o-mini', value: 'gpt-4o-mini' },
  { label: 'gpt-4o', value: 'gpt-4o' },
  { label: 'gpt-4-turbo', value: 'gpt-4-turbo' },
  { label: 'gpt-4', value: 'gpt-4' },
  { label: 'gpt-3.5-turbo', value: 'gpt-3.5-turbo' },
  { label: 'gpt-3.5-turbo-instruct', value: 'gpt-3.5-turbo-instruct' },
];

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsDialog() {
  const { keys, model, setKey, setModel } = useSettings();
  const [tempKeys, setTempKeys] = useState(keys);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { getOptions, setOption } = useEditorPlugin(CopilotPlugin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Object.entries(tempKeys).forEach(([service, key]) => {
      setKey(service, key);
    });
    setOpen(false);

    // Update AI options if needed
    const completeOptions = getOptions().completeOptions ?? {};
    setOption('completeOptions', {
      ...completeOptions,
      body: {
        ...completeOptions.body,
        apiKey: tempKeys.openai,
        model: model.value,
      },
    });
  };

  const toggleKeyVisibility = (key: string) => {
    setShowKey((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderApiKeyInput = (service: string, label: string) => (
    <div className="group relative">
      <div className="flex items-center justify-between">
        <label
          className="absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
          htmlFor={label}
        >
          <span className="inline-flex bg-background px-2">{label}</span>
        </label>
        <Button
          asChild
          className="absolute right-[28px] top-0 h-full"
          size="icon"
          variant="ghost"
        >
          <a
            className="flex items-center"
            href={
              service === 'openai'
                ? 'https://platform.openai.com/api-keys'
                : 'https://uploadthing.com/dashboard'
            }
            rel="noopener noreferrer"
            target="_blank"
          >
            <ExternalLinkIcon className="size-4" />
            <span className="sr-only">Get {label}</span>
          </a>
        </Button>
      </div>

      <Input
        className="pr-10"
        data-1p-ignore
        id={label}
        onChange={(e) =>
          setTempKeys((prev) => ({ ...prev, [service]: e.target.value }))
        }
        placeholder=""
        type={showKey[service] ? 'text' : 'password'}
        value={tempKeys[service]}
      />
      <Button
        className="absolute right-0 top-0 h-full"
        onClick={() => toggleKeyVisibility(service)}
        size="icon"
        type="button"
        variant="ghost"
      >
        {showKey[service] ? (
          <EyeOff className="size-4" />
        ) : (
          <Eye className="size-4" />
        )}
        <span className="sr-only">
          {showKey[service] ? 'Hide' : 'Show'} {label}
        </span>
      </Button>
    </div>
  );

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            'group fixed bottom-4 right-4 z-50 size-10 overflow-hidden',
            'rounded-full shadow-md hover:shadow-lg',
            'transition-all duration-300 ease-in-out hover:w-[106px]'
          )}
          data-block-hide
          size="icon"
          variant="default"
        >
          <div className="flex size-full items-center justify-start gap-2">
            <Settings className="ml-1.5 size-4" />
            <span
              className={cn(
                'whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out',
                'group-hover:translate-x-0 group-hover:opacity-100',
                '-translate-x-2'
              )}
            >
              Settings
            </span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Settings</DialogTitle>
          <DialogDescription>
            Configure your API keys and preferences.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-10" onSubmit={handleSubmit}>
          {/* AI Settings Group */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                <Wand2Icon className="size-4 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold">AI</h4>
            </div>

            <div className="space-y-4">
              {renderApiKeyInput('openai', 'OpenAI API key')}

              <div className="group relative">
                <label
                  className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
                  htmlFor="select-model"
                >
                  Model
                </label>
                <Popover onOpenChange={setOpenModel} open={openModel}>
                  <PopoverTrigger asChild id="select-model">
                    <Button
                      aria-expanded={openModel}
                      className="w-full justify-between"
                      role="combobox"
                      size="lg"
                      variant="outline"
                    >
                      <code>{model.label}</code>
                      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search model..." />
                      <CommandEmpty>No model found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {models.map((m) => (
                            <CommandItem
                              key={m.value}
                              onSelect={() => {
                                setModel(m);
                                setOpenModel(false);
                              }}
                              value={m.value}
                            >
                              <Check
                                className={cn(
                                  'mr-2 size-4',
                                  model.value === m.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              <code>{m.label}</code>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Upload Settings Group */}
          {/* <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-red-100 p-2 dark:bg-red-900">
                <Upload className="size-4 text-red-600 dark:text-red-400" />
              </div>
              <h4 className="font-semibold">Upload</h4>
            </div>

            <div className="space-y-4">
              {renderApiKeyInput('uploadthing', 'Uploadthing API key')}
            </div>
          </div> */}

          <Button className="w-full" size="lg" type="submit">
            Save changes
          </Button>
        </form>

        <p className="text-sm text-muted-foreground">
          Not stored anywhere. Used only for current session requests.
        </p>
      </DialogContent>
    </Dialog>
  );
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [keys, setKeys] = useState({
    openai: '',
    uploadthing: '',
  });
  const [model, setModel] = useState<Model>(models[0]);

  const setKey = (service: string, key: string) => {
    setKeys((prev) => ({ ...prev, [service]: key }));
  };

  return (
    <SettingsContext.Provider value={{ keys, model, setKey, setModel }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  return (
    context ?? {
      keys: {
        openai: '',
        uploadthing: '',
      },
      model: models[0],
      setKey: () => {},
      setModel: () => {},
    }
  );
}
